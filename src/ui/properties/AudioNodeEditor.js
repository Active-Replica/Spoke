import React from "react";
import PropTypes from "prop-types";
import NodeEditor from "./NodeEditor";
import InputGroup from "../inputs/InputGroup";
import AudioInput from "../inputs/AudioInput";
import BooleanInput from "../inputs/BooleanInput";
import { VolumeUp } from "styled-icons/fa-solid/VolumeUp";
import AudioParamsProperties from "./AudioParamsProperties";
import useSetPropertySelected from "./useSetPropertySelected";
import { SourceType } from "../../editor/objects/AudioParams";

//mike
import NumericInputGroup from "../inputs/NumericInputGroup";
//mikend

export default function AudioNodeEditor(props) {
  const { editor, node } = props;
  const onChangeSrc = useSetPropertySelected(editor, "src");
  const onChangeControls = useSetPropertySelected(editor, "controls");
  const onChangeAutoPlay = useSetPropertySelected(editor, "autoPlay");
  const onChangeLoop = useSetPropertySelected(editor, "loop");
  const onChangeProxPlay = useSetPropertySelected(editor, "proxPlay");
  const onChangePlayRad = useSetPropertySelected(editor, "playRad");
  const onChangePauseRad = useSetPropertySelected(editor, "pauseRad");
  const onChangeShouldReset = useSetPropertySelected(editor, "shouldReset");

  return (
    <NodeEditor description={AudioNodeEditor.description} {...props}>
      <InputGroup name="Audio Url">
        <AudioInput value={node.src} onChange={onChangeSrc} />
      </InputGroup>
      <InputGroup name="Controls" info="Toggle the visibility of the media controls in Hubs.">
        <BooleanInput value={node.controls} onChange={onChangeControls} />
      </InputGroup>
      <InputGroup name="Proximity Play" info="To use this feature, please set Auto Play to false">
        <BooleanInput value={node.proxPlay} onChange={onChangeProxPlay} />
      </InputGroup>
      {node.proxPlay && (
        <>
          <NumericInputGroup
            name="Play Threshold"
            info="The radius at which the audio will play."
            min={0.001}
            smallStep={0.1}
            mediumStep={1}
            largeStep={10}
            value={node.playRad}
            onChange={onChangePlayRad}
          />
          <NumericInputGroup
            name="Pause Threshold"
            info="The radius at which the audio will pause."
            min={0.001}
            smallStep={0.1}
            mediumStep={1}
            largeStep={10}
            value={node.pauseRad}
            onChange={onChangePauseRad}
          />
          <InputGroup name="File Should Reset" info="This toggle will reset the audio file on each activation">
            <BooleanInput value={node.shouldReset} onChange={onChangeShouldReset} />
          </InputGroup>
        </>
      )}
      <InputGroup name="Auto Play" info="If true, the media will play when first entering the scene.">
        <BooleanInput value={node.autoPlay} onChange={onChangeAutoPlay} />
      </InputGroup>
      <InputGroup name="Loop" info="If true the media will loop indefinitely.">
        <BooleanInput value={node.loop} onChange={onChangeLoop} />
      </InputGroup>
      <AudioParamsProperties sourceType={SourceType.MEDIA_VIDEO} {...props} />
    </NodeEditor>
  );
}

AudioNodeEditor.propTypes = {
  editor: PropTypes.object,
  node: PropTypes.object,
  multiEdit: PropTypes.bool
};

AudioNodeEditor.iconComponent = VolumeUp;

AudioNodeEditor.description = "Dynamically loads audio.";
