
const ProfileImage = ({ src, alt }: { src: string, alt: string }) => {
  return (
    <div className="rounded-full w-[32px] h-[32px] bg-cover bg-no-repeat" style={{ backgroundImage: `url(${src})` }} title={alt}></div>
  );
};

export default ProfileImage;
