import { atom } from "jotai";
import { records } from "@/data/records";
import type { RecordData } from "@/data/records";

export const selectedRecordAtom = atom<RecordData>(records[0]);
