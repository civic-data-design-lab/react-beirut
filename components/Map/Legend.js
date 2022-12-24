const Legend = ({ width }) => {
  const getLegendContent = () => {
    const craftCategories = [
      'Architectural',
      'Cuisine',
      'Decorative',
      'Fashion',
      'Functional',
      'Furniture',
      'Textiles',
      'None',
    ];
    return (
      <div className={'legend-content'}>
        {craftCategories.map((craft) => {
          return (
            <div className={'legend-section'}>
              <div className={`legend-color ${craft.toLowerCase()}`}></div>
              <p className={'legend-label'}>{craft}</p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={'map-legend'}>
      <h3 className={'card-labels'}>Legend</h3>
      <hr />
      {getLegendContent()}
    </div>
  );
};

export default Legend;
