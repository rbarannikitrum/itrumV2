import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'textTransform'
})
export class TextTransformPipe implements PipeTransform {

  transform(task: string, ...args: unknown[]): void | string {
    const taskArr = task.split(' ')
    const boolStr = taskArr.some((el: string) => {
      return el.length > 5
    })
    if (boolStr) {
      return task
    }
  }

}
