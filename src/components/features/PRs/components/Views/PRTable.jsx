import Tag from "../../../../ui/Tag";
import { useNavigate } from "react-router";
function PRRow({ pr }) {
  const navigate = useNavigate();

  const variantMap = {
    Ready: "open",
    Blocked: "draft",
    Review: "review",
    Stale: "default",
  };

  return (
    <tr
      onClick={() => navigate(`/pull-requests/${pr.id}`)}
      className="cursor-pointer border-t border-divider hover:bg-hover"
    >
      <td className="px-4 py-3">
        <div className="font-medium text-primary">{pr.title}</div>
        <div className="text-xs text-secondary">#{pr.id}</div>
      </td>

      <td className="px-4 py-3 text-secondary">{pr.repo}</td>

      <td className="px-4 py-3 text-xs text-secondary">
        <span className="rounded bg-surface-elev px-1.5 py-0.5">
          {pr.sourceBranch}
        </span>
        <span className="mx-1">→</span>
        <span className="rounded bg-surface-elev px-1.5 py-0.5">
          {pr.targetBranch}
        </span>
      </td>

      <td className="px-4 py-3 text-secondary">{pr.author}</td>

      <td className="px-4 py-3">
        <Tag variant={variantMap[pr.status]}>
          {pr.status}
        </Tag>
      </td>

      <td className="px-4 py-3">
        <div className="flex flex-wrap gap-1">
          {pr.tags.map((t) => (
            <span
              key={t}
              className="rounded bg-surface-elev px-2 py-0.5 text-xs text-primary"
            >
              {t}
            </span>
          ))}
        </div>
      </td>

      <td className="px-4 py-3 text-secondary">{pr.updated}</td>
    </tr>
  );
}

export default PRRow;
