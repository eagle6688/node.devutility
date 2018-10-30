;
(function ($, window, document, undefined) {
    var pluginName = 'uploadHelper',
        version = '20170123';

    var defaults = {
        file: null,
        url: '',
        uploadThreadsCount: 1,
        sliceSize: 1 * 1024 * 1024,
        needMD5Checksum: false,
        formData: null,
        formNames: {
            slice: 'slice',
            sliceIndex: 'sliceIndex',
            sliceCount: 'sliceCount',
            sliceChecksum: 'sliceChecksum',
            fileName: 'fileName'
        },
        beforeUpload: function (data) { },
        uploading: function (data) { },
        uploaded: function (data) { },
        failed: function (data) { }
    };

    function Plugin(options) {
        this.options = $.extend(true, {}, defaults, options);
        this.init();
    }

    Plugin.prototype.init = function () {
        this.initModel();
        this.initQueue();
    };

    Plugin.prototype.initModel = function () {
        if (this.options.sliceSize === 0) {
            this.options.sliceSize = this.options.file.size;
        }

        this.model = {
            name: this.options.file.name,
            size: this.options.file.size,
            sliceCount: Math.ceil(this.options.file.size / this.options.sliceSize)
        };

        // Can not put these two variables in model.
        this.loaded = 0;
        this.percentage = 0;
    };

    Plugin.prototype.initQueue = function () {
        this.slicesQueue = [];
        this.failedSlicesQueue = [];

        for (var i = 0; i < this.model.sliceCount; i++) {
            var start = i * this.options.sliceSize,
                end = Math.min(this.options.file.size, start + this.options.sliceSize);

            this.slicesQueue.push({
                isSuccessed: false,
                response: null,
                index: i,
                size: end - start,
                start: start,
                end: end
            });
        }
    };

    Plugin.prototype.start = function () {
        if (this.options.beforeUpload) {
            this.options.beforeUpload(this.model);
        }

        for (var i = 0; i < Math.min(this.model.sliceCount, this.options.uploadThreadsCount) ; i++) {
            this.upload();
        }
    };

    Plugin.prototype.reUploadFailedSlices = function () {
        for (var i = 0; i < this.failedSlicesQueue.length; i++) {
            this.slicesQueue.push(this.failedSlicesQueue[i]);
        }

        this.failedSlicesQueue = [];
        this.upload();
    };

    Plugin.prototype.upload = function () {
        var self = this;
        var slice = this.getSlice();

        if (!slice) {
            return;
        }

        var formData = this.getFormData(slice);

        if (this.options.needMD5Checksum) {
            checksumMD5(slice.sliceFile, function (md5) {
                if (md5) {
                    formData.set(self.options.formNames.sliceChecksum, md5);
                }

                self.execUploader(slice, formData);
            });
        }
        else {
            this.execUploader(slice, formData);
        }
    };

    Plugin.prototype.execUploader = function (slice, formData) {
        var uploader = this.getUploader(slice, formData);
        slice.sliceFile = null;
        uploader.upload();
    };

    Plugin.prototype.getSlice = function () {
        var slice = this.slicesQueue.shift();

        if (!slice) {
            return null;
        }

        slice.sliceFile = this.options.file.slice(slice.start, slice.end);
        return slice;
    };

    Plugin.prototype.getFormData = function (slice) {
        var formData = new FormData();

        if (this.options.formData) {
            formData = this.options.formData;
        }

        formData.set(this.options.formNames.slice, slice.sliceFile);
        formData.set(this.options.formNames.sliceIndex, slice.index);
        formData.set(this.options.formNames.sliceCount, this.model.sliceCount);
        formData.set(this.options.formNames.fileName, this.model.name);
        return formData;
    };

    Plugin.prototype.getUploader = function (slice, formData) {
        var self = this;

        return new Uploader({
            url: this.options.url,
            formData: formData,
            slice: slice,
            uploading: function (data) {

            },
            uploaded: function (slice) {
                self.uploading(slice);
                self.uploaded(slice);
            },
            failed: function (slice) {
                self.failed(slice);
            }
        });
    };

    Plugin.prototype.uploading = function (slice) {
        this.model.slice = slice;
        this.model.loaded = this.loaded = this.loaded + slice.size;
        this.model.percentage = this.percentage = Math.floor(100 * this.loaded / this.model.size);

        if (this.options.uploading) {
            this.options.uploading(this.model);
        }
    };

    Plugin.prototype.uploaded = function (slice) {
        this.model.slice = slice;

        if (this.percentage === 100) {
            if (this.options.uploaded) {
                this.options.uploaded(this.model);
            }

            return;
        }

        this.upload();
    };

    Plugin.prototype.failed = function (slice) {
        this.model.slice = slice;
        this.failedSlicesQueue.push(slice);

        if (this.options.failed) {
            this.options.failed(this.model);
        }
    };

    function Uploader(options) {
        var defaults = {
            url: '',
            formData: null,
            slice: null,
            uploading: function (data) { },
            uploaded: function (data) { },
            failed: function (data) { }
        };

        this.resultTypes = {
            abort: 'abort',
            error: 'error',
            timeout: 'timeout',
            server: 'server'
        };

        this.options = $.extend(true, {}, defaults, options);
    };

    Uploader.prototype.init = function () {
        var self = this;
        this.xhr = new XMLHttpRequest();

        this.xhr.upload.onprogress = function (data) {
            self.uploading(data);
        };

        this.xhr.onloadend = function () {
            self.loadend();
        };

        this.xhr.onabort = function (e) {
            self.failed(self.getResult(self.resultTypes.abort, e));
        };

        this.xhr.onerror = function (e) {
            self.failed(self.getResult(self.resultTypes.error, e));
        };

        this.xhr.ontimeout = function (e) {
            self.failed(self.getResult(self.resultTypes.timeout, e));
        };
    };

    Uploader.prototype.upload = function () {
        this.init();
        this.xhr.open('POST', this.options.url);
        this.xhr.send(this.options.formData);
    };

    Uploader.prototype.uploading = function (data) {
        var state = {
            slice: this.options.slice,
            loaded: data.loaded,
            total: data.total,
            percentage: Math.floor(100 * data.loaded / data.total)
        };

        if (this.options.uploading) {
            this.options.uploading(state);
        }
    };

    Uploader.prototype.loadend = function () {
        var result;

        if ((this.xhr.status >= 200 && this.xhr.status < 300) || this.xhr.status === 304) {
            result = this.getResult(this.resultTypes.server, this.xhr.responseText);
            result.isSuccessed = true;
            this.uploaded(result);
        }
        else {
            result = this.getResult(this.resultTypes.error, this.xhr.responseText);
            this.failed(result);
        }

        this.options = null;
    };

    Uploader.prototype.uploaded = function (data) {
        if (this.options.uploaded) {
            this.options.uploaded(data);
        }
    };

    Uploader.prototype.failed = function (data) {
        if (this.options.failed) {
            this.options.failed(data);
        }
    };

    Uploader.prototype.getResult = function (type, response) {
        this.options.slice.type = type;

        if (this.resultTypes.server === type) {
            this.options.slice.response = $.parseJSON(response);
        }
        else {
            this.options.slice.response = response;
        }

        return this.options.slice;
    };

    var checksumMD5 = function (file, callback) {
        if (!window.FileReader) {
            alert('Your browser does not support FileReader, please change your browser!');
            callback();
            return;
        }

        var fileReader = new FileReader();

        fileReader.onloadend = function () {
            var latin = CryptoJS.enc.Latin1.parse(this.result);
            var value = CryptoJS.MD5(latin);
            callback(value.toString());
        }

        fileReader.readAsBinaryString(file);
    };

    $[pluginName] = function (options) {
        var plugin = new Plugin(options);

        return {
            upload: function () {
                plugin.start();
            },
            reUpload: function () {
                plugin.reUploadFailedSlices();
            }
        };
    };
})(jQuery, window, document);