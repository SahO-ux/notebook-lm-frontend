export default function ChatMessage({ role, content }) {
  return (
    <div
      className={`p-2 rounded-md max-w-[80%] ${
        role === "user"
          ? "bg-blue-100 self-end text-blue-900"
          : "bg-gray-100 self-start text-gray-800"
      }`}
    >
      {content}
    </div>
  );
}
