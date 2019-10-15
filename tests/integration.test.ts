import {UsernamePasswordCredential} from "../auth";
import {FamisClient} from "../famis_client";

describe('Attachments', () => {
    it('should fetch all attachments', async function() {
        const user = process.env.UNIT_TEST_USER as string;
        const psswd = process.env.UNIT_TEST_PSSWD as string;
        const baseUrl = process.env.UNIT_TEST_BASE_URL as string;

        if (!user || !psswd || !baseUrl) {
            fail("environment variables aren't set");
        }
        const credential = new UsernamePasswordCredential(user, psswd, baseUrl);
        const famisClient = new FamisClient(credential, baseUrl);

        const attachments = await famisClient.getAttachments();
        expect(attachments).toBeTruthy();
        expect(attachments.length).toBeGreaterThan(0);
    })
});

describe('Lists', () => {
    const user = process.env.UNIT_TEST_USER as string;
    const psswd = process.env.UNIT_TEST_PSSWD as string;
    const baseUrl = process.env.UNIT_TEST_BASE_URL as string;

    if (!user || !psswd || !baseUrl) {
        fail("environment variables aren't set");
    }
    const credential = new UsernamePasswordCredential(user, psswd, baseUrl);
    const famisClient = new FamisClient(credential, baseUrl);

    it('should fetch all account segments', async function() {
        const accountSegments = await famisClient.getAccountSegments();
        expect(accountSegments).toBeTruthy();
        expect(accountSegments.length).toBe(6);
    });

    it('should fetch all activity groups', async function () {
        const actvityGroups = await famisClient.getActivityGroups();
        expect(actvityGroups).toBeTruthy();
        expect(actvityGroups.length).toBe(4);
    });

    it('should fetch all asset classes', async function () {
        const assetClasses = await famisClient.getAssetClasses();
        expect(assetClasses).toBeTruthy();
        expect(assetClasses.length).toBe(144);
    });

    it('should fetch all asset keywords', async function () {
        const assetKeywords = await famisClient.getAssetKeywords();
        expect(assetKeywords).toBeTruthy();
        expect(assetKeywords.length).toBe(217);
    });

    it('should fetch asset with id 2575', async function () {
        const assets = await famisClient.getAssetsForFilter('Id eq 2575');
        expect(assets).toBeTruthy();
        expect(assets.length).toBe(1);
    });
});