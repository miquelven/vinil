import vinil1 from "@/assets/images/vinil-1.jpeg";
import vinil2 from "@/assets/images/vinil-2.jpeg";
import vinil3 from "@/assets/images/vinil-3.jpeg";
import vinil4 from "@/assets/images/vinil-4.jpeg";
import vinil5 from "@/assets/images/vinil-5.jpg";

export interface RecordData {
  id: string;
  albumName: string;
  artistName: string;
  image: string;
  musicUrl: string;
}

export const records: RecordData[] = [
  {
    id: "am",
    albumName: "Do I Wanna Know?",
    artistName: "AM",
    image: vinil1,
    musicUrl: "/musics/music-1.mp3",
  },
  {
    id: "construcao",
    albumName: "Construção",
    artistName: "Construção",
    image: vinil2,
    musicUrl: "/musics/music-2.mp3",
  },
  {
    id: "17",
    albumName: "Jocelyn Flores",
    artistName: "17",
    image: vinil3,
    musicUrl: "/musics/music-3.mp3",
  },
  {
    id: "africa-brasil",
    albumName: "Ponta de Lança Africano (Umbabarauma)",
    artistName: "África Brasil",
    image: vinil4,
    musicUrl: "/musics/music-4.mp3",
  },
  {
    id: "is-this-it",
    albumName: "Last Nite",
    artistName: "Is This It",
    image: vinil5,
    musicUrl: "/musics/music-5.mp3",
  },
];
