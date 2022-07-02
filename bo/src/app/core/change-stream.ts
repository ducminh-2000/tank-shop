import { Observable, throwError } from 'rxjs';
import { LoopBackConfig } from '../api';

declare var EventSource;

export interface ChangeStream<T> {
  type: string;
  data: T;
}

export function changeStreamForModel<T>(model: any, options: any): Observable<ChangeStream<T>> {
  if (typeof EventSource === 'undefined') {
    return throwError('EventSource is not supported');
  }

  options = options || {};

  return Observable.create(emitter => {
    const source = new EventSource([
      LoopBackConfig.getPath(),
      LoopBackConfig.getApiVersion(),
      model.getModelDefinition().path,
      'change-stream?options=' + JSON.stringify(options)
    ].join('/'));

    // /change-stream?access_token=QS2igya2TlySiOy8Ay4K08J48qFxoqp9C4iBEiEHwhF6kAJDGTKIG92vHy3JQzRl
    const emit = (msg: any) => {
      try {
        const data = JSON.parse(msg.data);
        emitter.next(data);
      } catch (e) {
        emitter.error(e);
      }
    };

    source.addEventListener('data', emit);
    source.onerror = emit;

    return () => {
      source.close();
    };
  });
}
