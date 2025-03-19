export default function Loader({ color = "black", size = "44px" }: { color?: "white" | "black", size?: string }) {
    const borderColor = color === "black" ? "border-slate-800 border-l-slate-300" : "border-slate-50 border-l-slate-800";

    return (
        <div
            className={`rounded-full border-[5px] animate-spin ${borderColor}`}
            style={{ height: size, width: size }}
        ></div>
    );
}
