import { Observable, throwError } from 'rxjs';
import { LoopBackConfig } from '../api';
export function changeStreamForModel(model, options) {
    if (typeof EventSource === 'undefined') {
        return throwError('EventSource is not supported');
    }
    options = options || {};
    return Observable.create(function (emitter) {
        var source = new EventSource([
            LoopBackConfig.getPath(),
            LoopBackConfig.getApiVersion(),
            model.getModelDefinition().path,
            'change-stream?options=' + JSON.stringify(options)
        ].join('/'));
        // /change-stream?access_token=QS2igya2TlySiOy8Ay4K08J48qFxoqp9C4iBEiEHwhF6kAJDGTKIG92vHy3JQzRl
        var emit = function (msg) {
            try {
                var data = JSON.parse(msg.data);
                emitter.next(data);
            }
            catch (e) {
                emitter.error(e);
            }
        };
        source.addEventListener('data', emit);
        source.onerror = emit;
        return function () {
            source.close();
        };
    });
}
//# sourceMappingURL=change-stream.js.map