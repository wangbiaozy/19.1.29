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
    

    //好友入口获得自己的花灯后点击确定进入交互页与好友拼花灯
    $('#qd-btn').on('click',function(){
        $('#gethd').hide();
        $('#jigsaw').show();
    });
    //好友入口点击拼灯交互页进入我的花灯成功&不成功页
    $('#jigsaw').on('click',function(){
        /* $('#jigsaw').hide();
        $('#con').hide();
        hideMask();
        $('#make').show(); */
        if(myLanType === friendLanType){
            $('#bingo').show().siblings().hide();
            $('.suc-friend').attr('src',imgPath + "r_" + friendLanType + ".png");
        }else if(myLanType !== friendLanType){
            $('#fail').show().siblings().hide();
            $('.suc-friend').attr('src','');
        }else{
            $('#fail').show().siblings().hide();
            $('.suc-friend').attr('src','');
        }
        localStorage.setItem('friend',true);
        window.location.href = '../index.html';
    });

    //发送好友按钮
    $('#share-btn').on('click',function(){
        $('#tofriend').hide();
        $('#con').hide();
        $('#make').show();
        $('#share-message').show();
        $('#mask').addClass('co');
        $('#fail').show().siblings().hide();
    });
    //生成专属海报按钮
    $('#make-btn').on('click',function(){
        if($('#pic').children().hasClass('box')){
            html2canvas(document.getElementById('pic')).then(function(canvas) {
                var imgUrl = canvas.toDataURL("image/png");
                $('#pic').html('<img src="'+imgUrl+'">');
            });
        }
        
        $('#can-code').css('z-index','200');
        $('#can-code>a').show();
        showMask();
    });

    //拼花灯记录查看按钮
    $('#record-list li').on('click','a',function(){
        var $this = $(this);
        $('#make').hide();
        $('#look-result').show();
        $('.look-friend-photo').attr('src',$this.siblings('img').attr('src'));
        $('.look-my-hd').attr('src',imgPath + 'l_'+$this.siblings('i#mlt').attr('class')+'.png');
        $('.look-friend').attr('src',imgPath + 'r_'+$this.siblings('i#flt').attr('class')+'.png');
        $('.look-percent').text(lanternsArr[$this.siblings('i#mlt').attr('class')][$this.siblings('i#flt').attr('class')-1].percent);
        $('.look-desc').text(lanternsArr[$this.siblings('i#mlt').attr('class')][$this.siblings('i#flt').attr('class')-1].desc);
        if($this.siblings('i#mlt').attr('class') === $this.siblings('i#flt').attr('class')){
            $('#look-result .box span').show();
        }else{
            $('#look-result .box span').hide();
        }
    });
    //拼灯结果返回记录页
    $('#golook').on('click',function(){
        $('#look-result').hide();
        $('#make').show();
    });

    //拼灯成功点击抽奖按钮
    $('#cj-btn').on('click',function(){
        if(register){
            if(!$(this).hasClass('act')){
                if(!CM){//同网
                    $('.zhongjiang').show();
                    showMask();
                }else{//异网
                    if(gift){
                        $('.zhuanzeng').show();
                        showMask();
                    }else{
                        $('.dhm').show();
                        showMask();
                    }
                }
                $(this).addClass('act');
            }else{
                if(give){
                    if(!CM){
                        $('.zhongjiang').show();
                        showMask();
                    }else{
                        $('.ywtc.over').show();
                        showMask();
                    }
                }else{
                    if(!CM){
                        $('.zhongjiang').show();
                        showMask();
                    }else{
                        $('.ywtc.zhuanzeng').show();
                        showMask();
                    }
                }
            }
        }else{
            $('#make').hide();
            $('.ljts').show();
        }
    });
    //注册页提交按钮
    $('.submit').on('click',function(){
        if(CM){
            if(gift){
                $('.zhuanzeng').show();
            }else{
                $('.dhm').show();
            }
        }else{
            $('.zhongjiang').show();
        }
        $('.ljts').hide();
        $('#make').show();
        showMask();
    });

    //拼灯失败点击按钮进入分享页
    $('#fail').on('click',function(){
        $('#share-message').show();
        showMask();
    });

    //移动手机号码验证
    function istel(tel) {
        var rtn = false;
        //移动号段验证
        var regtel = /^((13[4-9])|(15([0-2]|[7-9]))|(18[2|3|4|7|8])|(178)|(147))[\d]{8}$/;
        if (regtel.test(tel)) {
            rtn = true;
        }
        return rtn;
    }


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
