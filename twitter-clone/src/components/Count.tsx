export const Count = (props: { keyNumber: number; missType: number }) => {
  return (
    <div className="text-start">
      <p>タイプ数：{props.keyNumber}</p>
      <p>ミスタイプ数：{props.missType - props.keyNumber - 1}</p>
    </div>
  );
};
