// src/data/musicData.ts

export interface Music {
    title: string;
    artist: string;
    duration: string;
    src: string;
    cover: string;
  }
  
  const musicData: Music[] = [
    {
      title: '19-2000',
      artist: 'Gorillaz',
      duration: '3:21',
      src: '/audio/19-2000.mp3',
      cover: '/cover1.jpg'
    },
    {
      title: '15 Minutes',
      artist: 'Madison Beer',
      duration: '3:11',
      src: '/audio/15minutes.mp3',
      cover: '/cover2.jpg'
    },
    {
      title: 'Levan Polkka',
      artist: 'Hatsune Miku',
      duration: '2:29',
      src: '/audio/Levan Polkka.mp3',
      cover: '/cover3.gif'
    }
  ];
  
  export default musicData;
  