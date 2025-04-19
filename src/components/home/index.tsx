import homeVinilImg from "@/assets/images/home-vinil.svg";
import TextDecoration from "../text-decoration";
import { ChevronsDown } from "lucide-react";

export default function Home() {
  return (
    <main className="flex justify-center items-center flex-col relative h-[75vh] pt-[47vh]">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
        <img
          src={homeVinilImg}
          alt="Imagem do vinil da home"
          className="animate-slow-spin"
        />
      </div>
      <h1 className="font-primary font-bold text-[80px]">
        Antes de ser{" "}
        <TextDecoration text={"ouvido,"} className="text-primary" /> o vinil é{" "}
        <TextDecoration text={"sentido."} className="text-primary" />
      </h1>
      <ChevronsDown
        className=" animate-soft-bounce-down"
        color="#f5e9da"
        size={60}
      />
    </main>
  );
}
