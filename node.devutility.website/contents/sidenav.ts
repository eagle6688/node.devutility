namespace Sidenav{
    export function init(){
        vueSidebar(); 
    }

    export let initNum:number = 0;

    function vueSidebar(){
        new Vue({
            el:"#page-sidebar",
            data:{
                show: true,
                num: initNum
            },
            mounted(){
                console.log(this.show)
            },
            methods:{
                toggleNav(index:number){
                    if(this.num == index){
                        this.show = !this.show;
                    }else{
                        this.show = true;
                    }
                    this.num = index;                              
                },
                slidebarToggle(){
                    var body = $('body');
                    var sidebar = $('.page-sidebar');
            
                    if ((body.hasClass("page-sidebar-hover-on") && body.hasClass('page-sidebar-fixed')) || sidebar.hasClass('page-sidebar-hovering')) {
                        body.removeClass('page-sidebar-hover-on');
                        sidebar.css('width', '').hide().show();  
                        return;
                    }                                 
                    if (body.hasClass("page-sidebar-closed")) {
                        body.removeClass("page-sidebar-closed");
                        if (body.hasClass('page-sidebar-fixed')) {
                            sidebar.css('width', '');
                        } 
                    } else {
                        body.addClass("page-sidebar-closed"); 
                    } 
                }
            }
        }) 
    }
}
import sidebar = Sidenav;
export default sidebar;