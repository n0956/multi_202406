$(function(){
    // gnb_btn에 클릭을 하면 gnb가 위에서 아래로 나타난다.
    let gnbNum = 0;
    $('.gnb_btn').click(function(){
        gnbNum++
        if(gnbNum%2==1){
            $('.gnb').slideDown()
            $('#header').css('background-color','rgb(255, 248, 232)')
        }else{
            $('.gnb').slideUp()
            $('#header').css('background-color','rgba(0, 0, 0,0)')
        }
    })


    let about = $('#about').offset().top
    let skillTop = $('#skill').offset().top
    let portfolio = $('#portfolio').offset().top
    let contact = $('#contact').offset().top

    let pageScroll = [about,skillTop,portfolio,contact]
    $('.gnb ul li').each(function(index){
        $(this).click(function(){
            event.preventDefault()
            $('html,body').animate({scrollTop:pageScroll[index]},500)
            gnbNum = 0
            $('.gnb').css('display','none')
            $('#header').css('background-color','rgba(0, 0, 0,0)')
        })
    })

    // topBanner좌우로 움직이는 애니메이션 효과
    // top_img가 좌우로 움직이는 효과
    // top_text가 나타나고 사라지는 효과
    // controls의 색이 변하는 효과
    // 선언적 함수 (명령을 선언해서 사용하는 방식)
    function topSlider(number){
        // top이미지가 좌우로 움직이는 코드
        $('.top_img').animate({left:-(100*number)+'%'},500)

        $('.top_text li').eq(number).fadeIn().siblings().fadeOut()
        $('.controls li').eq(number).addClass('select').siblings().removeClass()
    }
    //  controls의 버튼을 눌러서 topSlider를 실행시키는 코드
    $('.controls li').each(function(index){
        $(this).click(function(){
            topSlider(index)
            btnNum=index // 버튼 클릭 넘버와 컨트롤 클릭 넘버 동기화
        })
    })

    let btnNum = 0

    $('#topBanner .next').click(function(){
        btnNum++
        if(btnNum>2){
            btnNum=0
        }
        topSlider(btnNum)
    })
    $('#topBanner .prev').click(function(){
        btnNum--
        if(btnNum<0){
            btnNum=2
        }
        topSlider(btnNum)
    })

    function autoSlider(){
        $('#topBanner .next').trigger('click') 
    }

    auto = setInterval(autoSlider,3000)

    $('.stop').click(function(){
        clearInterval(auto)
    })
    $('.play').click(function(){
        clearInterval(auto)
        auto = setInterval(autoSlider,3000)
    })


    // skill
    let scrollTop
    $(window).scroll(function(){
        scrollTop= $(this).scrollTop()
        if(scrollTop>skillTop-100){
            $('.skill_list>li').each(function(index){
                $(this).delay(200*index).animate({opacity:1, top:0},500)
            })
        }
        if(scrollTop>portfolio-100){
            $('.port div').animate({
                left:0,
                opacity:1
            })
        }
        if(scrollTop>contact-300){
            $('.contact_info li').each(function(index){
                $(this).delay(index*200).animate({
                    left:0,
                    opacity:1
                })
            })
            $('.sns li').each(function(index){
                $(this).delay(index*200).animate({
                    top:0,
                    opacity:1
                })
            })
        }
    })

    // Go to Top
    $(".top_btn").click(function(){
       $('html,body').animate({scrollTop:'0px'},800)
    })

    // portfolio
    let mov = ['mov/movie1.mp4','mov/movie2.mp4']
    
    $('.port1').each(function(index){
        $(this).find('.port_btn').click(function(){
            $('.light_wrap').fadeIn()  
            $('.videos').attr('src',mov[index])  
            return false;               
        })
    })
    
    $('.close_btn').click(function(){
        $('.light_wrap, .light_wrap2').fadeOut()
        $('.videos').get(0).pause()                
    })

    $('.port2').each(function(index){
        $(this).find('.port_btn').click(function(){
            $('.light_wrap2').fadeIn()  
            $('.light_img').attr('src',lightImg[index])                 
        })
    })
}) // 문서 준비 이벤트 E