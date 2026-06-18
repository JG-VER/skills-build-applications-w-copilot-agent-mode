import { useEffect, useState } from 'react'
import { fetchCollection } from '../api'

function CollectionView({ resource, title, description, columns, renderCard }) {
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadItems() {
      try {
        setStatus('loading')
        const nextItems = await fetchCollection(resource)

        if (isMounted) {
          setItems(nextItems)
          setStatus('ready')
        }
      } catch (nextError) {
        if (isMounted) {
          setError(nextError instanceof Error ? nextError.message : 'Unable to load data')
          setStatus('error')
        }
      }
    }

    loadItems()

    return () => {
      isMounted = false
    }
  }, [resource])

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Octofit Tracker</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      {status === 'loading' && <div className="status-panel">Loading {title.toLowerCase()}...</div>}

      {status === 'error' && (
        <div className="status-panel status-panel-error" role="alert">
          {error}
        </div>
      )}

      {status === 'ready' && items.length === 0 && (
        <div className="status-panel">No {title.toLowerCase()} found.</div>
      )}

      {status === 'ready' && items.length > 0 && (
        <>
          <div className="table-responsive data-table-wrap">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key} scope="col">
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item._id ?? item.id ?? JSON.stringify(item)}>
                    {columns.map((column) => (
                      <td key={column.key}>{formatValue(column.accessor(item))}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mobile-card-list">
            {items.map((item) => (
              <article className="data-card" key={item._id ?? item.id ?? JSON.stringify(item)}>
                {renderCard(item)}
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

function formatValue(value) {
  if (Array.isArray(value)) {
    return value.join(', ')
  }

  if (value === null || value === undefined || value === '') {
    return '—'
  }

  if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    return new Date(value).toLocaleDateString()
  }

  return value
}

export default CollectionView