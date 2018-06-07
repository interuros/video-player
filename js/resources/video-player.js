'use strict';

window.onload = function(){

    let video = document.querySelector('video');
    let volumeTrack = document.querySelector('.volume-track');
    let videoPlay = document.querySelector('.video-button');
    let videoOverlay = document.querySelector('.video-overlay')
    let defaultVolume = volumeTrack.value / 100;

    let volumeOn = document.querySelector('.volume-on');
    let volumeOff = document.querySelector('.volume-off');

    let videoClicked = false;

    volumeOff.style. display = 'none';

    video.volume = defaultVolume;
    console.log(defaultVolume);
    
    //plays video
    videoPlay.addEventListener('click', () => {
        videoOverlay.style.display = 'none';
        video.play();

    });

    //pause video
    video.addEventListener('click', () => {
        
        if(!videoClicked){
            video.pause();
            videoClicked = true;
        } else{
            video.play();
            videoClicked = false;
        }
    });


    //change volume function
    let currentVolume = () => {
        let chosenVolume = volumeTrack.value / 100;
        video.volume = chosenVolume;

        if(volumeTrack.value == 0){
            volumeOff.style.display = 'block';
            volumeOn.style.display = 'none';
        } else{
            volumeOff.style.display = 'none';
            volumeOn.style.display = 'block';
        }

        console.log(chosenVolume);
        

        return chosenVolume;
    }


    //changes volume on input range value change
    volumeTrack.addEventListener('input', currentVolume);


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





    let videoLengthTrack = document.querySelector('.video-length-track');
    let videoLengthTrackMax = document.querySelector('.time-track').offsetWidth;


    //changes time track width 
    window.addEventListener('resize', () =>{
        videoLengthTrackMax = document.querySelector('.time-track').offsetWidth;

        if(video.ended){
            videoLengthTrack.style.width = videoLengthTrackMax + 'px';
        }
    });


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
    

    //changes the time passed tack depending on video current time
    video.ontimeupdate = () => {
        videoLengthTrack.style.width = (videoLengthTrackMax * video.currentTime) / video.duration + 'px';

        let currentVideoTime = document.querySelector('.time-passed');
        let videoDuration = video.duration;
        let videoHours = Math.floor(videoDuration / 3600);
        let videoMinutes = Math.floor((videoDuration - videoHours * 3600) / 60);
        let videoSeconds = Math.round(videoDuration - videoHours * 3600 - videoMinutes * 60);

        if(videoHours === 0){
                maxTime.textContent = `${videoMinutes}:${videoSeconds}`;
        } else{
            maxTime.textContent = `${videoHours}:${videoMinutes}:${videoSeconds}`;
        }

    }

    

    


}