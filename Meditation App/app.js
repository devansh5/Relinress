const app=() =>{
    const song=document.querySelector('.song');
    const play=document.querySelector('.play');
    const outline=document.querySelector('.moving-outline circle');
    const video=document.querySelector('.vid-container video')
    const timeSelect=document.querySelectorAll('.time-select button')

    const sounds=document.querySelectorAll('.sound-picker button');

    const timeDisplay=document.querySelector('.time-display');

    //get the length the outline

    const outlinelength=outline.getTotalLength();
    console.log(outlinelength);

    //Duration
    let duration=600;

    // starting it from zero
    outline.style.strokeDasharray=outlinelength;
    outline.style.strokeDashoffset=outlinelength;


    // pick the different sounds;

    sounds.forEach(sound=>{
        sound.addEventListener('click',function(){
            song.src=this.getAttribute('data-sound');
            video.src=this.getAttribute('data-video');
            checkplaying(song);
        });
    });

    // play the sound

    play.addEventListener('click',()=>{
        checkplaying(song);
    });

    // select the sound
    timeSelect.forEach(option =>{
        option.addEventListener('click',function(){
            duration=this.getAttribute('data-time');
            timeDisplay.textContent=`${Math.floor(duration/60)}:${Math.floor(duration%60)}`;

        });
    })
    

// stop the play and play the sound
    const checkplaying =song=>{
    if(song.paused){
        song.play();
        video.play();
        play.src='./svg/pause.svg';
    }else{
        song.pause();
        video.pause();
        play.src='./svg/play.svg';
    }
}
// animating the circle
song.ontimeupdate=() => {
    let currentTime=song.currentTime;
    let elapsed=duration-currentTime;
    //second and minutes
    let seconds = Math.floor(elapsed%60);
    let minutes=Math.floor(elapsed/60);
    // animate the moving circle

    let progress=outlinelength - (currentTime/duration)*outlinelength;
    outline.style.strokeDashoffset=progress;

    // animate the timing

    timeDisplay.textContent=`${minutes}:${seconds}`;

    if (currentTime>=duration){
        song.pause();
        song.currentTime=0;
        play.src='./svg/play.svg';
        video.pause();
    }
};

};
app();