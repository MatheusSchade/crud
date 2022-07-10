import InputTextTp from "./InputTextTp";

export default interface InputMaskedTp extends InputTextTp {
  mask?: string | Array<RegExp>
}