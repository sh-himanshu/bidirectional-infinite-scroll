interface ItemProps {
  imgUrl: string;
}

const Item = ({ imgUrl }: ItemProps) => {
  return (
    <div className="w-full h-28">
      <img src={imgUrl} className="h-full w-full object-cover rounded-lg" />
    </div>
  );
};

export default Item;
