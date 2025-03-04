    let canvas = document.querySelector('canvas');
    let context = canvas.getContext('2d');

    const frames = {
        currentFrame: 0,
        maxFrames: 1345
    }

    let loadedImage = 0;
    const images = [];
    function preloadImages (){

        for(var i = 1; i <= frames.maxFrames; i++){

            let imageURL = `./images/frame_${i.toString().padStart(4, 0)}.jpg`;
            let image = new Image();
            image.src = imageURL;
            image.onload = function() {

                loadedImage++;
                if(loadedImage === frames.maxFrames){
                loadImage(frames.currentFrame)
                }

            }
            images.push(image);
            
        }

    }

    function loadImage(index){

        if(index >= 0 && index <= frames.maxFrames){
            let img = images[index];

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            let scaleX = canvas.width / img.width;
            let scaleY = canvas.height / img.height;
            let scale = Math.max(scaleX, scaleY);

            let newWidth = img.width * scale;
            let newHeight = img.height * scale;

            let offsetX = (canvas.width - newWidth) / 2;
            let offsetY = (canvas.height - newHeight) / 2;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
            context.imageSmoothingQuality = 'high';
            context.imageSmoothingEnabled = true;

            frames.currentFrame = index

        }

    }

    function updateFrames(newFrames){
        return {
            currentFrame: newFrames,
            onUpdate: () => {
                loadImage(Math.floor(frames.currentFrame))
            }
        }
    }

    function startAnimation(){

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".parent",
                start: "top top",
                end: "bottom bottom",
                scrub: 2,
            }
        });

        tl.to(frames, updateFrames(70), "a");
        tl.to('.animate-1',{
            opacity: 0,
            ease: 'easel',
        }, "a")

        tl.to(frames, updateFrames(120));
        tl.to(frames, updateFrames(190), "b");
        tl.from('.animate-2',{
            opacity: 0,
            ease: 'easel',
        }, "b")
        tl.to(frames, updateFrames(240));
        tl.to(frames, updateFrames(310), "c");
        tl.to('.animate-2',{
            opacity: 0,
            ease: 'easel',
        }, "c")

        tl.to(frames, updateFrames(360));
        tl.to(frames, updateFrames(430), "d");
        tl.from('.animate-3',{
            opacity: 0,
            ease: 'easel',
        }, "d")
        tl.to(frames, updateFrames(480));
        tl.to(frames, updateFrames(550), "e");
        tl.to('.animate-3',{
            opacity: 0,
            ease: 'easel',
        }, "e")

        tl.to(frames, updateFrames(600));
        tl.to(frames, updateFrames(670), "f");
        tl.from('.animate-4',{
            opacity: 0,
            ease: 'easel',
        }, "f")
    
        tl.to(frames, updateFrames(720), "g");
        tl.to('.animate-4',{
            opacity: 0,
            ease: 'easel',
        }, "g")

        tl.to(frames, updateFrames(850));
        tl.to(frames, updateFrames(1100));
        tl.to(frames, updateFrames(1345));

    }

    preloadImages();

    document.addEventListener('DOMContentLoaded', () => {
        startAnimation();
    });