import { ChangeEvent, createRef, FocusEvent, MouseEvent, useId } from 'react';
import './hypnosis.scss';
import tts from '../../lib/tts';

export default function () {
  const text = createRef<HTMLTextAreaElement>();
  const ids = {
    textarea: useId(),
    submit: useId(),
  } as const;

  const getUnique = (txt: string): Set<string> => {
    const words: string[] = txt
      .toUpperCase()
      .split(/\s+/g)
      .filter((s) => Boolean(s));
    return new Set(words);
  };

  const halt = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    if (tts.instance.synth.speaking) tts.instance.synth.cancel();
    const elem = event.currentTarget;
    elem.value = elem.value.toUpperCase();
    const unique = getUnique(elem.value);
    if (unique.size > 50) {
      elem.value = [...unique].join(' ');
      return;
    }
  };

  const clean = (event: FocusEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    const elem = event.currentTarget;
    const unique = getUnique(elem.value);
    elem.value = [...unique].join(' ');
  };

  const speak = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (tts.instance.synth.speaking) {
      tts.instance.synth.cancel();
      return;
    }
    tts.instance.utterer.text = (text.current?.value ?? '')
      .split(/\s+/g)
      .join(', ');
    if (tts.instance.utterer.voice) {
      tts.instance.speak();
      return;
    }
    const english = tts.instance.synth
      .getVoices()
      .find((voice) => voice.lang === 'en-US');
    const voice = english ?? tts.instance.synth.getVoices()[0];
    tts.instance.utterer.voice = voice;
    tts.instance.utterer.lang = voice.lang;
    tts.instance.speak();
  };

  return (
    <div id="hypnosis">
      <div className="words-input">
        <label htmlFor={ids.textarea} className="words-label">
          Words
        </label>
        <textarea
          id={ids.textarea}
          placeholder="Words to utter repeatedely..."
          className="words"
          autoFocus={true}
          autoCorrect="off"
          onChange={halt}
          onBlur={clean}
          ref={text}
        ></textarea>
      </div>
      <input
        className="words-submit"
        type="button"
        value="Speak"
        onClick={speak}
      />
    </div>
  );
}
