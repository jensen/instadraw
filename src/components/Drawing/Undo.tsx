import { PrimaryButton, DangerButton } from "~/components/common/Button";
import { useUndo } from "./context";

export default function Undo() {
  const { undo, clear, canUndo, canClear } = useUndo();

  return (
    <div className="p-2 space-y-2">
      <PrimaryButton onClick={undo} disabled={canUndo === false}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 512 512"
        >
          <path
            fill={`rgba(49, 46, 129, ${canUndo ? "1" : "0.2"})`}
            d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z"
          />
        </svg>
      </PrimaryButton>
      <DangerButton onClick={clear} disabled={canClear === false}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 448 512"
        >
          <path
            fill={`rgba(127, 29, 29, ${canClear ? "1" : "0.2"})`}
            d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
          />
        </svg>
      </DangerButton>
    </div>
  );
}
