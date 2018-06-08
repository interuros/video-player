'use strict';

window.onload = function(){

    let videoContainer = document.querySelector('.video');
    let video = document.getElementById('js--video');
    let volumeTrack = document.querySelector('.volume-track');
    let videoPlay = document.querySelector('.video-button');
    let videoOverlay = document.querySelector('.video-overlay')

    volumeTrack.value = 4;

    let defaultVolume = volumeTrack.value / 100;

    let volumeOn = document.querySelector('.volume-on');
    let volumeOff = document.querySelector('.volume-off');

    //selects length of time track and of the passed time track
    let videoLengthTrack = document.querySelector('.video-length-track');
    let videoLengthTrackMax = document.querySelector('.time-track').offsetWidth;
    let fullscreenOn = document.querySelector('.fullscreen-on');
    let fullscreenOff = document.querySelector('.fullscreen-off');

    //hides the volume off icon
    volumeOff.style. display = 'none';

    //sets video volume to default volume
    video.volume = defaultVolume;
    console.log(defaultVolume);
    
    //plays video
    videoPlay.addEventListener('click', () => {
        videoOverlay.style.display = 'none';
        video.play();

    });

    //pause video
    video.addEventListener('click', () => {
        
        if(video.paused){
            video.play();
            playButton.style.display = 'none';
            pauseButton.style.display = 'block';
        } else{
            video.pause();
            playButton.style.display = 'block';
            pauseButton.style.display = 'none';
        }
    });


    //change volume function
    let changeVolume = () => {
        let chosenVolume = volumeTrack.value / 100;
        video.volume = chosenVolume;

        if(volumeTrack.value == 0){
            volumeOff.style.display = 'block';
            volumeOn.style.display = 'none';
        } else{
            volumeOff.style.display = 'none';
            volumeOn.style.display = 'block';
        }
        

        return chosenVolume;
    }


    //changes volume on input range value change
    volumeTrack.addEventListener('input', changeVolume);


    //mutes video on volume on icon click
    volumeOn.addEventListener('click', () => {
        volumeOn.style.display = 'none';
        volumeOff.style.display = 'block';
        volumeTrack.value = 0;
        video.volume = volumeTrack.value;
    });
    
    //turns up the volume to 50% on volume off icon click
    volumeOff.addEventListener('click', () => {
        volumeOn.style.display = 'block';
        volumeOff.style.display = 'none';
        volumeTrack.value = 50;
        video.volume = volumeTrack.value / 100;
    });

    //changes time track width 
    window.addEventListener('resize', () =>{
        videoLengthTrackMax = document.querySelector('.time-track').offsetWidth;

        if(video.ended){
            videoLengthTrack.style.width = videoLengthTrackMax + 'px';
        }
    });


    //displays video length
    {   
        let maxTime = document.querySelector('.max-time');
        let videoDuration = video.duration;
        let videoHours = Math.floor(videoDuration / 3600);
        let videoMinutes = Math.floor((videoDuration - videoHours * 3600) / 60);
        let videoSeconds = Math.round(videoDuration - videoHours * 3600 - videoMinutes * 60);

        if(videoHours === 0){
                maxTime.textContent = `${videoMinutes}:${videoSeconds}`;
        } else{
            maxTime.textContent = `${videoHours}:${videoMinutes}:${videoSeconds}`;
        }

        console.log('hours:' +videoHours);
        console.log('minutes:' + videoMinutes);
        console.log('Seconds:' + videoSeconds);
        
        console.log(video.duration);
    }
    

    //changes the time passed tack depending on video current time and updates time passed
    video.ontimeupdate = () => {

        videoLengthTrack.style.width = (videoLengthTrackMax * video.currentTime) / video.duration + 'px';

        let timePassed = document.querySelector('.time-passed');
        let videoCurrentTtime = video.currentTime;
        let videoCurrentHours = Math.floor(videoCurrentTtime / 3600);
        let videoCurrentMinutes = Math.floor((videoCurrentTtime - videoCurrentHours * 3600) / 60);
        let videoCurrentSeconds = Math.round(videoCurrentTtime - videoCurrentHours * 3600 - videoCurrentMinutes * 60);

        if(videoCurrentSeconds < 10){
            videoCurrentSeconds = '0' + videoCurrentSeconds;
        }

        if(videoCurrentHours === 0){
                timePassed.textContent = `${videoCurrentMinutes}:${videoCurrentSeconds}`;
        } else{
            timePassed.textContent = `${videoCurrentHours}:${videoCurrentMinutes}:${videoCurrentSeconds}`;
        }

    }


    //sets video time to +10 or -10 seconds

    let tenSeconds = (event) => {

        if(video.offsetWidth < event.clientX){
            video.currentTime += 10;    
        } else {
            video.currentTime -= 10;  
        }


    }


    video.addEventListener('dblclick', tenSeconds(event));

    
    
    let playButton = document.querySelector('.play-video');
    let pauseButton = document.querySelector('.pause-video');


    //plays video on play icons click
    playButton.addEventListener('click', () =>{

        video.play();
        playButton.style.display = "none";

        pauseButton.style.display = 'block';


    });


    // pauses video on pause icons click
    pauseButton.addEventListener('click', () =>{

        video.pause();
        pauseButton.style.display = "none";

        playButton.style.display = 'block';

    });

    let isfullscreen = false;
    
    //get fullscreen video
    fullscreenOn.addEventListener('click', () =>{

        if(videoContainer.requestFullscreen) {
            videoContainer.requestFullscreen();
          } else if(videoContainer.mozRequestFullScreen) {
            videoContainer.mozRequestFullScreen();
          } else if(videoContainer.webkitRequestFullscreen) {
            videoContainer.webkitRequestFullscreen();
          } else if(videoContainer.msRequestFullscreen) {
            videoContainer.msRequestFullscreen();
          }

          fullscreenOn.style.display = "none";
          fullscreenOff.style.display = "block";

    });

    //minimize video
    fullscreenOff.addEventListener('click', () =>{

        if(document.exitFullscreen) {
            document.exitFullscreen();
          } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }

          fullscreenOff.style.display = "none";
          fullscreenOn.style.display = "block";

    });



    document.addEventListener('fullscreenchange', fullscreenOffEsc);
    document.addEventListener('webkitfullscreenchange', fullscreenOffEsc);
    document.addEventListener('mozfullscreenchange', fullscreenOffEsc);
    document.addEventListener('MSFullscreenChange', fullscreenOffEsc);

    function  fullscreenOffEsc(){

        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            fullscreenOff.style.display = "none";
            fullscreenOn.style.display = "block";
        }
    
    }
   


}