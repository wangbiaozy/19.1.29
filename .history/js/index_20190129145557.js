(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
$(function () {
    


    //获取验证码
    function getCodeStyle(btnId) {
        var orderTime = 60,
            timeLeft = orderTime,
            btn = btnId;
        function timeCount(){
            timeLeft-=1;
            if (timeLeft>0){
                btn.val(timeLeft+"s重新获取");
                setTimeout(timeCount,1000);
                btn.css({
                    color: '#a2a2a2'
                });
            }
            else {
                btn.val("发送验证码");
                btn.css({
                    color: '#000000'
                });
                timeLeft = orderTime;
                btn.removeAttr("disabled");
            }
        }
        btn.on('click', function () {
            $(this).attr("disabled",true);
            timeCount();
        });
    }
    getCodeStyle($('#codeBtn'));

    //查看关联服务说明
    $(".other").on('click',function(){
        $('.tips').show();
        showMask();
    });

    //关闭中奖弹窗切换抽奖按钮状态
    $('.zj.close').on('click',function(){
        $('#cj-btn').addClass('act');
        if($(this).hasClass('jump')){
            window.location.href = 'https://mp.weixin.qq.com/s/K6W3CaZajWdDb4WgBxJUXQ';
        }
    });
    //显示异网转赠弹窗
    function showYwtc(){
        $('.ywtc.zhuanzeng').show();
        showMask();
    }
    //showYwtc();
    //异网弹窗--转赠确定按钮
    $('.zztc-btn').on('click',function(){
        $(this).parent().hide();
        $('.ywtc.tel').show();
    });
    //异网弹窗--输入号码确定按钮
    $('.teltc-btn').on('click',function(){
        if(istel($('#yd-tel').val())){
            $(this).parent().hide();
            $('.ywtc.queren').show();
            $('#fri-tel').text($('#yd-tel').val());
        }else{
            alert('请输入正确的北京移动手机号')
        }
    });
    //异网弹窗--信息确认
    //修改按钮
    $('.qrbtn-1').on('click',function(){
        $(this).parent().hide();
        $('.ywtc.tel').show();
    });
    //确定按钮
    $('.qrbtn-2').on('click',function(){
        $(this).parent().hide();
        $('.ywtc.over').show();
        give = true;
    });

    //异网弹窗--转赠完毕确定按钮
    $('.over-btn').on('click',function(){
        window.location.href = 'https://mp.weixin.qq.com/s/LJmMLZ038k6ArxI6olGhHw';
    });



    //关闭弹窗按钮
    $('.close').on('click',function(){
        if($(this).parent().attr('id') !== 'can-code'){
            $(this).parent().hide();
        }else{
            $(this).parent().css('z-index','-1');
            $('#can-code>a').hide();
        }
        hideMask();
    });

    //复制兑换码
    var clipboard = new ClipboardJS('#copy-btn');
    clipboard.on('success', function (e) {
        $('#copy-btn').addClass('act').text('已复制');
        e.clearSelection();
        console.log(e.clearSelection);
    }); 

    //查看兑换方法
    $('#look-way-btn').on('click',function(){
        $('.ywtc.dhm').hide();
        $('.make').hide();
        hideMask();
        $('.way').show();
    });

    //兑换 方法页返回
    $('.way-back').on('click',function(){
        $('.way').hide();
        $('.make').show();
        $('.ywtc.dhm').show();
        showMask();
    });

    //点击遮罩层
    $('#mask,#share-message').on('click',function(){
        if($('#share-message').css('display') === 'block'){
            $('#share-message').hide();
            hideMask();
        }
    });
    //显示遮罩层
    function showMask(){
        $("#mask").css("height",$(document).height());
        $("#mask").css("width",$(document).width());
        $("#mask").show();
        //$('body').css('position','fixed');
    }
    //隐藏遮罩层
    function hideMask(){
        $("#mask").hide();
        //$('body').css('position','unset');
    }
    

    //测试按钮
    $('.test1').on('click',function(){
        attention = false;
    });
    $('.test2').on('click',function(){
        isOwn = false;
    });
    $('.test3').on('click',function(){
        myLanType=friendLanType;
        $('.my-hd').attr("src",imgPath + "l_" + myLanType + ".png");
        $('.percent').text(lanternsArr[myLanType][friendLanType-1].percent);
        $('.desc').text(lanternsArr[myLanType][friendLanType-1].desc);
    });
    $('.test4').on('click',function(){
        register = false;
    });
    $('.test5').on('click',function(){
        CM = true;
    });
    $('.test6').on('click',function(){
        gift = false;
    });
});
