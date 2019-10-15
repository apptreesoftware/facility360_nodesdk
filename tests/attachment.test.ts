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
        const famisClient = new FamisClient(credential, "https://st-uvic.famis.ca");

        const attachments = await famisClient.getAttachments();
        expect(attachments).toBeTruthy();
        expect(attachments.length).toBeGreaterThan(0);
    })
});