import { ArgumentMetadata, Injectable, Logger, PipeTransform } from "@nestjs/common";

@Injectable()
export class FreezePipe<T> implements PipeTransform {
    private readonly logger = new Logger(FreezePipe.name);
    transform(value: T) {
        this.logger.debug(FreezePipe.name, " Running....");
        Object.freeze(value);
        return value;
    }
}