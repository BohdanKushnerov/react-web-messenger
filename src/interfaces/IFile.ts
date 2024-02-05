export interface IFile {
  url: string;
  name: string;
  type: string;
  // уже есть ширина и высота на сервере
  width?: number;
  height?: number;
}