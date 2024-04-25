import Image from "next/image";

export default function Loading(){
    return <>
    <h1>loading</h1>
    <Image src="/assets/images/loading.svg" width={50} height={50}/>
    </>
}