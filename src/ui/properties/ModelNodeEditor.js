import React, { Component } from "react";
import PropTypes from "prop-types";
import NodeEditor from "./NodeEditor";
import SelectInput from "../inputs/SelectInput";
import InputGroup from "../inputs/InputGroup";
import BooleanInput from "../inputs/BooleanInput";
import ModelInput from "../inputs/ModelInput";
import { Cube } from "styled-icons/fa-solid/Cube";
import { GLTFInfo } from "../inputs/GLTFInfo";
import AttributionNodeEditor from "./AttributionNodeEditor";

//mike
import NumericInputGroup from "../inputs/NumericInputGroup";
import StringInput from "../inputs/StringInput";
import Vector3Input from "../inputs/Vector3Input";
//mikend

export default class ModelNodeEditor extends Component {
  static propTypes = {
    editor: PropTypes.object,
    node: PropTypes.object,
    multiEdit: PropTypes.bool
  };

  static iconComponent = Cube;

  static description = "A 3D model in your scene, loaded from a GLTF URL or file.";

  onChangeSrc = (src, initialProps) => {
    this.props.editor.setPropertiesSelected({ ...initialProps, src });
  };

  onChangeAnimation = activeClipItems => {
    this.props.editor.setPropertySelected("activeClipItems", activeClipItems || []);
  };

  onChangeCollidable = collidable => {
    this.props.editor.setPropertySelected("collidable", collidable);
  };

  onChangeWalkable = walkable => {
    this.props.editor.setPropertySelected("walkable", walkable);
  };

  onChangeCastShadow = castShadow => {
    this.props.editor.setPropertySelected("castShadow", castShadow);
  };

  onChangeReceiveShadow = receiveShadow => {
    this.props.editor.setPropertySelected("receiveShadow", receiveShadow);
  };

  onChangeCombine = combine => {
    this.props.editor.setPropertySelected("combine", combine);
  };

  onChangeBillboard = billboard => {
    this.props.editor.setPropertySelected("billboard", billboard);
  };
  //mike

  onChangeProxTrans = proxTrans => {
    this.props.editor.setPropertySelected("proxTrans", proxTrans);
  };

  onChangeEnterDist = enterDist => {
    this.props.editor.setPropertySelected("enterDist", enterDist);
  };

  onChangeExitDist = exitDist => {
    this.props.editor.setPropertySelected("exitDist", exitDist);
  };

  onChangeMinScale = minScale => {
    this.props.editor.setPropertySelected("minScale", minScale);
  };

  onChangeMinPos = minPos => {
    this.props.editor.setPropertySelected("minPos", minPos);
  };

  onChangeMinRot = minRot => {
    this.props.editor.setPropertySelected("minRot", minRot);
  };

  onChangeMaxScale = maxScale => {
    this.props.editor.setPropertySelected("maxScale", maxScale);
  };

  onChangeMaxPos = maxPos => {
    this.props.editor.setPropertySelected("maxPos", maxPos);
  };

  onChangeMaxRot = maxRot => {
    this.props.editor.setPropertySelected("maxRot", maxRot);
  };

  onChangeAnimDuration = animDuration => {
    this.props.editor.setPropertySelected("animDuration", animDuration);
  };

  onChangeAnimEasing = animEasing => {
    this.props.editor.setPropertySelected("animEasing", animEasing);
  };
  //mikend

  isAnimationPropertyDisabled() {
    const { multiEdit, editor, node } = this.props;

    if (multiEdit) {
      return editor.selected.some(selectedNode => selectedNode.src !== node.src);
    }

    return false;
  }

  render() {
    const node = this.props.node;

    return (
      <NodeEditor description={ModelNodeEditor.description} {...this.props}>
        <InputGroup name="Model Url">
          <ModelInput value={node.src} onChange={this.onChangeSrc} />
        </InputGroup>
        <InputGroup name="Loop Animation">
          <SelectInput
            disabled={this.isAnimationPropertyDisabled()}
            options={node.getClipOptions()}
            value={node.activeClipItems}
            onChange={this.onChangeAnimation}
            className="basic-multi-select"
            classNamePrefix="select"
            isMulti
          />
        </InputGroup>
        <InputGroup name="Collidable">
          <BooleanInput value={node.collidable} onChange={this.onChangeCollidable} />
        </InputGroup>
        <InputGroup name="Walkable">
          <BooleanInput value={node.walkable} onChange={this.onChangeWalkable} />
        </InputGroup>
        <InputGroup name="Cast Shadow">
          <BooleanInput value={node.castShadow} onChange={this.onChangeCastShadow} />
        </InputGroup>
        <InputGroup name="Receive Shadow">
          <BooleanInput value={node.receiveShadow} onChange={this.onChangeReceiveShadow} />
        </InputGroup>
        <InputGroup name="Combine">
          <BooleanInput value={node.combine} onChange={this.onChangeCombine} />
        </InputGroup>
        <InputGroup name="Billboard" info="Model always faces user in Hubs. Does not billboard in Spoke.">
          <BooleanInput value={node.billboard} onChange={this.onChangeBillboard} />
        </InputGroup>
        {node.proxTrans && (
          <>
            <NumericInputGroup
              name="Enter Distance"
              info="The distance at which to move to Ending Transform Properties."
              min={0.001}
              smallStep={0.1}
              mediumStep={1}
              largeStep={10}
              value={node.enterDist}
              onChange={this.onChangeEnterDist}
            />
            <NumericInputGroup
              name="Exit Distance"
              info="The distance at which to move back to Starting Transform Properties."
              min={0.001}
              smallStep={0.1}
              mediumStep={1}
              largeStep={10}
              value={node.exitDist}
              onChange={this.onChangeExitDist}
            />
            <InputGroup name="Starting Scale">
              <Vector3Input
                value={node.minScale}
                smallStep={0.01}
                mediumStep={0.1}
                largeStep={1}
                onChange={this.onChangeMinScale}
              />
            </InputGroup>
            <InputGroup name="Starting Position">
              <Vector3Input
                value={node.minPos}
                smallStep={0.01}
                mediumStep={0.1}
                largeStep={1}
                onChange={this.onChangeMinPos}
              />
            </InputGroup>
            <InputGroup name="Starting Rotation">
              <Vector3Input
                value={node.minRot}
                smallStep={0.01}
                mediumStep={0.1}
                largeStep={1}
                onChange={this.onChangeMinRot}
              />
            </InputGroup>
            <InputGroup name="Ending Scale">
              <Vector3Input
                value={node.maxScale}
                smallStep={0.01}
                mediumStep={0.1}
                largeStep={1}
                onChange={this.onChangeMaxScale}
              />
            </InputGroup>
            <InputGroup name="Ending Position">
              <Vector3Input
                value={node.maxPos}
                smallStep={0.01}
                mediumStep={0.1}
                largeStep={1}
                onChange={this.onChangeMaxPos}
              />
            </InputGroup>
            <InputGroup name="Ending Rotation">
              <Vector3Input
                value={node.maxRot}
                smallStep={0.01}
                mediumStep={0.1}
                largeStep={1}
                onChange={this.onChangeMaxRot}
              />
            </InputGroup>
            <NumericInputGroup
              name="Animation Duration"
              info="Time for animation duration in milliseconds. Minimum is 0."
              min={0}
              smallStep={0.1}
              mediumStep={1}
              largeStep={10}
              value={node.animDuration}
              onChange={this.onChangeAnimDuration}
            />
            <InputGroup name="Animation Easing">
              <StringInput id="animEasing" value={node.animEasing} onChange={this.onChangeAnimEasing} />
            </InputGroup>
          </>
        )}
        {node.model && <GLTFInfo node={node} />}
        <AttributionNodeEditor name="Attribution" {...this.props} />
      </NodeEditor>
    );
  }
}
