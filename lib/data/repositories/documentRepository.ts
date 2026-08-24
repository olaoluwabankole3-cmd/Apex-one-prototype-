import { DocumentItem } from "@/lib/types";
import { documents } from "@/lib/mockData";
import { isDemoMode } from "@/lib/demo";

export interface DocumentRepository {
  getDocuments(organizationId?: string): Promise<DocumentItem[]>;
}

export class MockDocumentRepository implements DocumentRepository {
  async getDocuments(organizationId?: string): Promise<DocumentItem[]> {
    if (!isDemoMode()) return [];
    return documents.map(d => ({ ...d, organizationId: organizationId || "apex-demo" }));
  }
}

export const documentRepository = new MockDocumentRepository();
