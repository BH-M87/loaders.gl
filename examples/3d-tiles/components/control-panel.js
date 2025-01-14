import styled from 'styled-components';
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
  max-width: 320px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  padding: 12px 24px;
  margin: 20px;
  font-size: 13px;
  line-height: 2;
  outline: none;
  z-index: 100;
`;

const DropDown = styled.select`
  margin-bottom: 12px;
`;

const propTypes = {
  category: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  mapStyles: PropTypes.object.isRequired,
  selectedMapStyle: PropTypes.string.isRequired,
  droppedFile: PropTypes.string,
  onExampleChange: PropTypes.func,
  onMapStyleChange: PropTypes.func,
  children: PropTypes.node
};

const defaultProps = {
  droppedFile: null,
  onChange: () => {}
};

export default class ControlPanel extends PureComponent {
  _renderByCategories() {
    const {category, name, onExampleChange, data} = this.props;
    const categories = Object.keys(data);
    const selectedValue = `${category}.${name}`;

    return (
      <DropDown
        value={selectedValue}
        onChange={evt => {
          const selected = evt.target.value;
          const value = selected.split('.');
          onExampleChange({category: value[0], name: value[1]});
        }}
      >
        {categories.map((c, i) => {
          const categoryExamples = data[c].examples;
          return (
            <optgroup key={i} label={c}>
              {Object.keys(categoryExamples).map((e, j) => {
                const value = `${c}.${e}`;
                return (
                  <option key={j} value={value}>
                    {e}
                  </option>
                );
              })}
            </optgroup>
          );
        })}
      </DropDown>
    );
  }

  _renderMapStyles() {
    const {onMapStyleChange, mapStyles, selectedMapStyle} = this.props;

    return (
      <DropDown
        value={selectedMapStyle}
        onChange={evt => {
          const selected = evt.target.value;
          onMapStyleChange({selectedMapStyle: selected});
        }}
      >
        {Object.keys(mapStyles).map(key => {
          return (
            <option key={key} value={mapStyles[key]}>
              {key}
            </option>
          );
        })}
      </DropDown>
    );
  }

  _renderDropped() {
    const {droppedFile} = this.props;
    return droppedFile ? <div>Dropped file: {JSON.stringify(droppedFile.name)}</div> : null;
  }

  render() {
    return (
      <Container>
        {this._renderMapStyles()}
        {this._renderByCategories()}
        {this._renderDropped()}
        {this.props.children}
      </Container>
    );
  }
}

ControlPanel.propTypes = propTypes;
ControlPanel.defaultProps = defaultProps;
