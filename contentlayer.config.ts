import {
  defineDocumentType,
  ComputedFields,
  makeSource
} from 'contentlayer/source-files'
import readingTime from 'reading-time';


export const Post = defineDocumentType(() => ({
  name: 'Podcast',
  filePathPattern: `episodes/*.mdx`,
bodyType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'The title of the post',
      required: true,
    },
    date: {
      type: 'date',
      description: 'The date of the post',
      required: true,
    },
    summary: {
      type: 'string',
      required: true
    },
    image: {
      type: 'string',
      required: true
    },
 audioPath: {
      type: 'string',
      required: false
    }
  },
  computedFields
}));


const computedFields: ComputedFields = {
  readingTime: {
    type: 'json',
    resolve: (doc) => readingTime(doc.body.raw)
  },
  wordCount: {
    type: 'number',
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length
  },

  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, '')
  }
};

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Post],
});