import Image from "next/image";

export function Avatar({ userImage }) {
  return <Image src={userImage} alt="me" width="64" height="64" />;
}
