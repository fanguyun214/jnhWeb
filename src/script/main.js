require.config({
    //默认主路径
    baseUrl:'src/script',
    paths:{
        //一些库文件
        'zepto': 'lib/zepto.min',
        'route': 'lib/route',
        'template': 'lib/template'
    },
    //指定模块名称和模块依赖
    shim:{
        'zepto':{
            exports:'$'
        }
    },
    //预加载
    /*deps:['template'],*/
    waitSeconds: 0,//禁止等待超时
    //urlArgs: "bust=" + (new Date()).getTime()  //防止读取缓存，调试用
});
//define(name,[],function(){})
//define(名称,[依赖模块],函数)--名称可省略
define(['zepto','route','template'],function($,diqye,template){
        //浮层公共方法
        function openMessageBox(msg){
            var $mainBg = $("#mainBg");
            var $tipsBox = $("#tipsBox");
            var $tipsBoxText = $("#tipsBoxText");
            $mainBg.show();
            $tipsBox.show();
            $tipsBoxText.html(msg);
        }
        function closeMessageBox(){
            var $mainBg = $("#mainBg");
            var $tipsBox = $("#tipsBox");
            $mainBg.hide();
            $tipsBox.hide();
        }
        $(function($){
            var app = diqye.app;
            //路由声明
            var home = diqye.routefn();
            app.use('/',home);
            app.use(function(){
                document.write("404");
            });
            //绑定关闭弹出层事件
            $("#closeBoxBtn").click(function(){
                closeMessageBox();
            });
            //home路由
            home.use(function(req,next){
                console.log('进入home路由->');
                //这里可以动态加载js代码 从而达到动态添加home路由的功能（即按需加载)
                //url跳转
                //req.redirect('about');
                /*带参路由跳转*/
                //req.redirect('about',{a:'11',b:'ww'});
                next();//向下执行
            });
            //分路由设置
            home.use('/activity1',function(req,next){//活动页面1
                var html = template(document.getElementById('pageHome1').innerHTML, {
                    text: '活动页面1',
                    html: '<div id="test">添加动态HTML</div>'
                });
                $("#pageCont").html(html);
                //调用弹出层
                $("#boxButton").click(function(){
                    openMessageBox("平安嘉年华活动");
                })
                next();
            });
            //活动页面2
            home.use('/activity2',function(req,next){
                var html = template(document.getElementById('pageHome2').innerHTML, {
                    text: '活动页面2',
                    html: '<div id="test">添加动态HTML</div>'
                });
                $("#pageCont").html(html);
                next();
            });
            //活动页面3
            home.use('/activity3',function(req,next){
                var html = template(document.getElementById('pageHome3').innerHTML, {
                    text: '活动页面3',
                    html: '<div id="test">添加动态HTML</div>'
                });
                $("#pageCont").html(html);
                next();
            });
            //抽奖页面
            home.use('/start',function(req,next){
                var html = template(document.getElementById('pageStart').innerHTML, {});
                $("#pageCont").html(html);
                next();
            });
            //提交信息页面
            home.use('/message',function(req,next){
                var html = template(document.getElementById('pageMessage').innerHTML, {});
                $("#pageCont").html(html);
                next();
            });
            //路由路径console
            home.use(function(req,next){
                console.log('route use '+req.path);
                //next();
            });
            app.start();

        })
    }
);

