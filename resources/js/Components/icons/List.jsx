const List = ({ width, height, color }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} style={{ fill: color }} viewBox="0 0 256 256">
            <path d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8ZM40 72h176a8 8 0 0 0 0-16H40a8 8 0 0 0 0 16Zm176 112H40a8 8 0 0 0 0 16h176a8 8 0 0 0 0-16Z" />
        </svg>
    );
};

export default List;
