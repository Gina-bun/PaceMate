import { getInitials } from "../utils/getInitials";
interface ProfileAvatarProps {
  name: string;
  imageUrl?: string;
  editable?: boolean;
  onEditClick?: () => void;
  width?: number;
  height?:number;
}


export function ProfileAvatar({ name, imageUrl, editable, onEditClick, height = 24, width = 24 }: ProfileAvatarProps) {
  return (
    <div className={`relative`}>
      <div
        onClick={editable ? onEditClick : undefined}
        className={`w-${width} h-${height} rounded-md bg-orange-200 flex items-center justify-center text-2xl font-semibold text-orange-700 overflow-hidden ${
          editable ? "cursor-pointer" : ""
        }`}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          getInitials(name)
        )}
      </div>

      {editable && (
        <button
          onClick={onEditClick}
          className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-orange-400 text-white flex items-center justify-center text-sm"
        >
          +
        </button>
      )}
    </div>
  );
}