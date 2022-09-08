interface BroadcastButtonProps {
    title : string,
    fx: any
}

export default function BroadcastButton({ title, fx }: BroadcastButtonProps) {
  return (
    <>
      <button onClick={fx} > {title}</button>
    </>
  )
}
