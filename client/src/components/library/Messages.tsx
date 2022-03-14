export function ErrorMessage({ message = "" }: { message?: string }) {
  return <p style={{ padding: "20px", color: "red" }}>{message}</p>;
}

export function SuccessMessage({ message = "" }: { message?: string }) {
  return <p style={{ padding: "20px", color: "green" }}>{message}</p>;
}
