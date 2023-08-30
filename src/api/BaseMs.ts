import { APIResponse, BrowserContext, Request } from '@playwright/test';
import settings from '../settings/settings';

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

type Headers = {
    [key: string]: string;
};

export default abstract class BaseMs {
    protected constructor(
        protected readonly context: BrowserContext,
        // protected readonly mainUrl: string = config.get('urls.apiUrl') // only if exists
    ) {}

    protected async request(
        method: HttpMethod,
        url: string | Request,
        headers: Headers,
        data?: string | object,
        timeout: number = settings.short_timeout
    ): Promise<APIResponse> {
        return this.context.request.fetch(url, {
            method,
            headers,
            timeout,
            data,
        });
    }

    protected requestBuilder(): RequestBuilder {
        return new RequestBuilder(this.context);
    }
}

class RequestBuilder {
    private declare readonly baseUrl: string;
    private declare method: HttpMethod;
    private declare url: string | Request;
    private declare headers: Headers;
    private declare data?: string | object;
    private declare timeout: number;
    private declare context: BrowserContext;

    public constructor(context: BrowserContext) {
        this.context = context;
        this.timeout = settings.short_timeout; // Initialize with a default timeout
    }

    public setMethod(method: HttpMethod): this {
        this.method = method;
        return this;
    }

    public setUrl(url: string | Request): this {
        this.url = this.baseUrl + url;
        return this;
    }

    public setHeaders(headers: Headers): this {
        this.headers = headers;
        return this;
    }

    public setData(data: string | object): this {
        this.data = data;
        return this;
    }

    public setTimeout(timeout: number): this {
        this.timeout = timeout;
        return this;
    }

    public async build(): Promise<APIResponse> {
        return this.context.request.fetch(this.url, {
            method: this.method,
            headers: this.headers,
            timeout: this.timeout,
            data: this.data,
        });
    }
}
