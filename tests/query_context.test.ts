import {QueryContext} from "../model/request_context";
import { Filter } from '../model/odata';

describe('QueryContext', function () {
    it('should include select statement', function () {
        const context = new QueryContext().setSelect("Id,Name");
        const queryUrl = context.buildUrl("/test");
        const fullUrl = `http://example.com/${queryUrl}`;
        const uri = new URL(fullUrl);
        const select = uri.searchParams.get("$select");
        expect(select).toEqual("Id,Name")
    });
    it('should include expand', function () {
        const context = new QueryContext().setExpand("Id,Name");
        const queryUrl = context.buildUrl("/test");
        const fullUrl = `http://example.com/${queryUrl}`;
        const uri = new URL(fullUrl);
        const select = uri.searchParams.get("$expand");
        expect(select).toEqual("Id,Name")
    });
    it('should include expand', function () {
        const context = new QueryContext().setFilter("Name eq 'Joe'");
        const queryUrl = context.buildUrl("/test");
        const fullUrl = `http://example.com/${queryUrl}`;
        const uri = new URL(fullUrl);
        const select = uri.searchParams.get("$filter");
        expect(select).toEqual("Name eq 'Joe'")
    });
    it('accepts a Filter object and renders the escaped filter', function () {
        const context = new QueryContext().setFilter(Filter.eq('UserName', "O'Brien"));
        const queryUrl = context.buildUrl('/test');
        const uri = new URL(`http://example.com/${queryUrl}`);
        expect(uri.searchParams.get('$filter')).toEqual("UserName eq 'O''Brien'");
    });
    it('carries a per-call timeout override via setTimeout (not part of the URL)', function () {
        const context = new QueryContext().setSelect('Id').setTimeout(5000);
        expect(context.timeoutMs).toEqual(5000);
        // timeout is a request-config concern, never serialized into the OData URL
        const uri = new URL(`http://example.com/${context.buildUrl('/test')}`);
        expect(uri.searchParams.get('$select')).toEqual('Id');
        expect(uri.href).not.toContain('timeout');
    });
    it('defaults timeoutMs to undefined so the client default applies', function () {
        expect(new QueryContext().timeoutMs).toBeUndefined();
    });
    it('carries a per-call AbortSignal via setSignal (not part of the URL)', function () {
        const controller = new AbortController();
        const context = new QueryContext().setSelect('Id').setSignal(controller.signal);
        expect(context.signal).toBe(controller.signal);
        const uri = new URL(`http://example.com/${context.buildUrl('/test')}`);
        expect(uri.searchParams.get('$select')).toEqual('Id');
        expect(uri.href).not.toContain('signal');
    });
    it('defaults signal to undefined', function () {
        expect(new QueryContext().signal).toBeUndefined();
    });
    it('copyFromOther carries timeoutMs and signal', function () {
        const controller = new AbortController();
        const source = new QueryContext().setTimeout(7000).setSignal(controller.signal);
        const copy = new QueryContext().copyFromOther(source);
        expect(copy.timeoutMs).toEqual(7000);
        expect(copy.signal).toBe(controller.signal);
    });
});