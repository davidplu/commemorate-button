import { describe, expect, it } from "vitest"; import { classifier } from "./classifier"; import { calculateMetrics, testCases } from "./evaluation";
describe("memorial classifier",()=>{
 it("commemorates an explicit family memorial",()=>expect(classifier.classify("My grandfather passed away last night. I miss him. Rest easy, Grandpa.").interaction).toBe("commemorate"));
 it.each(["RIP my GPA after that exam 💀","My phone died halfway through the hike.","Tony Stark's death still gets me every time.","We're studying death imagery in Hamlet."])("keeps Like for %s",text=>expect(classifier.classify(text).interaction).toBe("like"));
 it("offers confirmation for borderline memorial language",()=>expect(classifier.classify("Remembering my mother today.").interaction).toBe("confirm"));
 it("achieves zero benchmark false positives",()=>{const m=calculateMetrics(testCases);expect(m.fp).toBe(0);expect(m.precision).toBe(1)});
});
