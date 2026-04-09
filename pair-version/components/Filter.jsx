function Filter({ filters, activeFilter, onChangeFilter }) {
  return (
    <div className="filter-group">
      {filters.map((filter) => (
        <button
          key={filter.key}
          type="button"
          className={`filter-button ${activeFilter === filter.key ? 'active' : ''}`}
          onClick={() => onChangeFilter(filter.key)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default Filter;
