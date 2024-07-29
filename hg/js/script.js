//카운트
$(document).ready(function () {


  var swiper = new Swiper(".mySwiper", {
    pagination: {
      el: ".swiper-pagination",
    },
  });


  var options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  var callback = function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var $this = $(entry.target);
        var countTo = parseInt($this.attr('data-count'), 10);
        var increment = parseInt($this.attr('data-increment'), 10);
        var current = 0;
        var duration = 2000; // 총 애니메이션 시간 (밀리초)
        var intervalTime = Math.ceil(duration / (countTo / increment));

        var interval = setInterval(function () {
          current += increment;
          $this.text(current.toLocaleString());

          if (current >= countTo) {
            clearInterval(interval);
            $this.text(countTo.toLocaleString());
          }
        }, intervalTime);

        observer.unobserve(entry.target);
      }
    });
  };

  var observer = new IntersectionObserver(callback, options);

  $('.counterup').each(function () {
    observer.observe(this);
  });
  
});





var commonScript = (function(){
  return {
    scrollTriggerFn:function(){   
      // **소개
      // 우측 이미지 영역 fix
      if($(".img_txt_wrap").size() > 0){
        ScrollTrigger.matchMedia({
          "(min-width : 769px)": function(){
            gsap.to(".fix_area", {
              scrollTrigger: {
                trigger: ".fix_area .change_img",
                //trigger: $(this),
                start:"top "+ "17% + 30",
                endTrigger: $(".fix_area"),
                end:"bottom+=400 "+ "87.5% + 30",
                pin:true,
                //markers: true,
                id: "right_fix",
                //scrub:1,
                onEnter: function(){
                  $(".fix_area").addClass("on");
                  $(".fix_area .txt_wrap").addClass("on");
                },
                onEnterBack: function(){
                  $(".fix_area").addClass("on");
                  $(".fix_area .txt_wrap").addClass("on");
                },
                onLeave: function(){
                  $(".fix_area").removeClass("on");
                  $(".fix_area .txt_wrap").removeClass("on");
                },
                onLeaveBack: function(){
                  $(".fix_area").removeClass("on");
                  $(".fix_area .txt_wrap").removeClass("on");
                }
              },
            });
            
            // 스크롤양에 따라 오른쪽 이미지 교체 모션
            $(".fix_area .change_img .img_box .img_li").each(function(q){
              gsap.to($(this), 1, {
                scrollTrigger: {
                  trigger: $(".fix_area .txt_wrap .txt_li").eq(q),
                  start:"top "+ "87.5% + 30",
                  end:"bottom " + "87.5% + 30",
                  scrub: 1,
                  //markers: true,
                  onUpdate: function(self){              
                    if(q>0){
                      gsap.to($(".fix_area .change_img .img_box .img_li").eq(q-1), 0, {top: -100*self.progress.toFixed(3)+"%", ease:Power3.easeOut});
                    }
                  }
                },
              });
            });

            // 왼족 글씨 영역 잠깐 fixed 시키기
            $(".fix_area .txt_wrap .txt_li").each(function(q){
              gsap.to($(this), 1, {
                scrollTrigger: {
                  trigger: $(this).find(".esg_txt"),
                  start:"bottom "+ "87.5% + 30",
                  end:"bottom+=400 "+ "87.5% + 30",
                  pin:true,
                  //pinSpacing: false,
                  scrub: 1,
                  //markers: true,
                  id: "left_txt_fix",
                },
              });
            });
          }
        });
      }
    },
  }
})();



$(window).on("load", function(){
  commonScript.scrollTriggerFn(); // 스크롤 트리거 모션
});


