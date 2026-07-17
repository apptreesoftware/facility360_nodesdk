import { Filter } from './odata';

export class QueryContext {
    filter?: string;
    expand?: string;
    select?: string;
    top?: number;
    skip?: number;
    orderBy?: string;
    /**
     * Per-call request timeout override (ms) for the HTTP requests this context drives.
     * Overrides the client's default `requestTimeoutMs`. Use for the rare endpoint whose
     * single (non-paginated) response legitimately runs longer than the default. Paginated
     * fetches don't need this — each page is a separate, individually-bounded request.
     */
    timeoutMs?: number;
    /**
     * Per-call AbortSignal for the HTTP requests this context drives. Lets a caller cancel
     * in-flight requests (e.g. a mobile user navigates away) instead of leaving them to run
     * to the timeout. Never serialized into the OData URL.
     */
    signal?: AbortSignal;

    setFilter(filter: string | Filter) {
        this.filter = filter.toString();
        return this;
    }

    setExpand(expand: string) {
        this.expand = expand;
        return this;
    }

    setSelect(select: string) {
        this.select = select;
        return this;
    }

    setTop(top: number) {
        this.top = top;
        return this;
    }

    setSkip(skip: number) {
        this.skip = skip;
        return this;
    }

    setOrderBy(orderBy: string) {
        this.orderBy = orderBy;
        return this;
    }

    /** Per-call HTTP request timeout override (ms). See `timeoutMs`. */
    setTimeout(timeoutMs: number) {
        this.timeoutMs = timeoutMs;
        return this;
    }

    /** Per-call AbortSignal to cancel the HTTP requests this context drives. See `signal`. */
    setSignal(signal: AbortSignal) {
        this.signal = signal;
        return this;
    }

    buildApiUrl(entity: string) {
        let urlPath = `MobileWebServices/api/${entity}`;
        return this.addFiltersToUrl(urlPath);
    }

    buildUrl(entity: string) {
        return this.addFiltersToUrl(`${basePath}/${entity}`);
    }

    buildPagedUrl(entity: string, top: number, skip: number, count: boolean = false) {
        let urlPath = `${basePath}/${entity}?$top=${top}&$skip=${skip}`;
        if (this.filter) {
            urlPath += `&$filter=${this.filter}`;
        }
        if (this.expand) {
            urlPath += `&$expand=${this.expand}`;
        }
        if (this.select) {
            urlPath += `&$select=${this.select}`;
        }
        if (this.orderBy) {
            urlPath += `&$orderby=${this.orderBy}`;
        }
        if (count) {
            urlPath += "&$count=true"
        }
        return urlPath;
    }

    /**
     * Keyset page URL: forces $orderby=Id and appends half-open Id bounds to the base
     * filter (Id gt <gt> and Id le <le>). No $skip. See docs/.../assets-keyset-parallel-paging.
     */
    buildKeysetUrl(entity: string, top: number, gt: number, le: number) {
        const bounds = `Id gt ${gt} and Id le ${le}`;
        const filter = this.filter ? `${this.filter} and ${bounds}` : bounds;
        let urlPath = `${basePath}/${entity}?$top=${top}&$orderby=Id&$filter=${filter}`;
        if (this.expand) urlPath += `&$expand=${this.expand}`;
        if (this.select) urlPath += `&$select=${this.select}`;
        return urlPath;
    }

    /** One-row Id probe to find min (desc=false) / max (desc=true), carrying the base filter. */
    buildKeysetBoundUrl(entity: string, desc: boolean) {
        let urlPath = `${basePath}/${entity}?$top=1&$orderby=Id${desc ? ' desc' : ''}&$select=Id`;
        if (this.filter) urlPath += `&$filter=${this.filter}`;
        return urlPath;
    }

    addFiltersToUrl(path: string) {
        let urlPath = path;
        let hasQuery = false;
        if (this.filter) {
            urlPath += `${hasQuery ? '&' : '?'}$filter=${this.filter}`;
            hasQuery = true
        }
        if (this.expand) {
            urlPath += `${hasQuery ? '&' : '?'}$expand=${this.expand}`;
            hasQuery = true
        }
        if (this.select) {
            urlPath += `${hasQuery ? '&' : '?'}$select=${this.select}`;
            hasQuery = true
        }
        if (this.top) {
            urlPath += `${hasQuery ? '&' : '?'}$top=${this.top}`;
            hasQuery = true
        }
        if (this.skip) {
            urlPath += `${hasQuery ? '&' : '?'}$skip=${this.skip}`;
            hasQuery = true
        }
        if (this.orderBy) {
            urlPath += `${hasQuery ? '&' : '?'}$orderby=${this.orderBy}`;
        }
        return urlPath;

    }

    copyFromOther(other: QueryContext): QueryContext {
        this.expand = other.expand;
        this.orderBy = other.orderBy;
        this.select = other.select;
        this.filter = other.filter;
        this.top = other.top;
        this.skip = other.skip;
        this.timeoutMs = other.timeoutMs;
        this.signal = other.signal;
        return this;
    }
}

export function buildEntityUrl(entity: string): string {
    return `${basePath}/${entity}`;
}

export const basePath = 'MobileWebServices/apis/360facility/v1';
