export function changeFieldType(input: HTMLInputElement) {
  input.type = input.type === 'text' ? 'password' : 'text';
}
