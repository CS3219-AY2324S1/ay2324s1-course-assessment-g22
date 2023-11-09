import Select from 'react-select'

export default function TagFilter({tags, handleTagChange}) {

      return (
        <Select 
        placeholder="Select Tag"
        isMulti
        onChange={handleTagChange}
        options={tags.map(tag => ({value: tag, label: tag}))}
        noOptionsMessage={() => "No Tags"} />
      )
}