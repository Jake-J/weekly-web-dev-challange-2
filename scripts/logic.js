$(document).ready(function() {

    //add new gallery items
    function appendNewImgs() {
        function addImg(src,alt){ 
            const mediumImgsContainer = $('.medium-gallery-items'),
                    newItem = $('<div>'),
                    box = $('<div>'),
                    img = $('<img>')    
            img.attr({
                "src": src, 
                "alt": alt,
                "class":"gallery-item"
            }); 
            newItem.addClass('col-md-6 col-sm-10 col-12');
            box.addClass('item-box');
            
            box.append(img);
            newItem.append(box);
            mediumImgsContainer.append(newItem);
            console.log('added');
        }
        $.getJSON("./data/test.json", function(json) { 
            for(const item in json.mediumImgs){   
                //console.log('start')
                addImg(json.mediumImgs[item].src,json.mediumImgs[item].alt)
            }
        }); 

    }


    //toggle navbar class when scrolled
    $(document).on('scroll',function () {
        const $nav = $(".navbar");
        function checkSection() {
            const sections = [].slice.call($('.section'));
            var sectionName;
            for (let i = 0; i < sections.length; i++){
                if(sections[i+1]){
                    if(sections[i].offsetTop-80 <= $(this).scrollTop() && sections[i+1].offsetTop >= $(this).scrollTop()){
                        sectionName = sections[i].id;
                    }
                }else if(sections[i+1] === undefined && sections[i].offsetTop-80 <= $(this).scrollTop()) {
                    sectionName = 'contact';
                }
            }
            if(sectionName !== undefined){
                (function() {
                    [].slice.call($('a.nav-link')).forEach(function(item){
                        item.classList.length > 1 ? item.classList.remove('active') : null;
                    });
                    $('a[href^="#' + sectionName + '"].nav-link').addClass('active');
                })();
            }
        }
        checkSection();
        $nav.toggleClass('scrolled',$(this).scrollTop() > $nav.height());
      });

    //smooth scrolling
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    });
    $('.gallery-btn').on('click',appendNewImgs);
})