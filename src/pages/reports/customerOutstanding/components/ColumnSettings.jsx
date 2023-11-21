import React from 'react'


const ColumnSettings = ({ columnVisibility, handleToggleCol }) => {
    return (
        <div>
            <label className='row bg-dark text-light mx-0 p-3 rounded-top-2' style={{ position: 'sticky', top: 0 }}>Column Settings</label>
            <div style={{ height: '24rem', overflow: 'hidden', overflowY: 'scroll' }} className='rounded-bottom-2 p-2 border'>
                <table className='w-100 mx-0'>
                    <thead style={{ position: 'sticky', top: 0, zIndex: 4 }}>
                        <tr className='text-light bg-secondary' >
                            <th>Field Name</th>
                            <th>Visibility</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(columnVisibility).map((columnName) => (
                            <tr key={columnName}>
                                <td>{columnName}</td>
                                <td><div class="ui fitted toggle checkbox">
                                    <input
                                        type='checkbox'
                                        checked={columnVisibility[columnName]}
                                        onChange={() => handleToggleCol(columnName)}
                                    />
                                    <label></label></div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ColumnSettings