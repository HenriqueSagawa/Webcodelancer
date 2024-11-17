interface LightProps {
    className?: string;
}

export function Light({className}: LightProps) {
    return (
        <div className={`h-10 w-10 bg-blue-400 rounded-full shadow-blue-400 shadow-2xl blur-2xl absolute ${className}`}></div>
    )
}